const catchAsync = require("../utils/catchAsync");
const Quiz = require("./../Model/QuizModel");
const Result = require("./../Model/ResultModel");
const jwt = require("jsonwebtoken");
const getEmail=require("./../utils/decodeToken")
exports.getQuizzes = catchAsync(async (req, res, next) => {
  const quizzes = await Quiz.find();
  res.status(200).json({
    message: "Successful",
    data: {
      quizzes,
    },
  });
  next();
});
exports.addQuiz = catchAsync(async (req, res, next) => {
  const quiz = req.body.quiz;
  const newQuiz = await Quiz.create(quiz);
  res.status(200).json({
    status: "Success",
    data: {
      quiz: newQuiz,
    },
  });

  next();
});

exports.getQuiz = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const quiz = await Quiz.findById(id).populate("questions");
  if (!quiz) {
    return res.status(404).json({
      status: "Failed",
      messages: "Quiz Not Found",
    });
  }

  res.status(200).json({
    status: "Successful",
    data: {
      quiz,
    },
  });

  next();
});

exports.editQuiz = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const quiz = req.body.quiz;
  const updatedQuiz = await Quiz.findRyIdAndUpdate(id, quiz, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    data: {
      quiz: updatedQuiz,
    },
  });

  next();
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedQuiz = await Quiz.findbyIdAndDelete(id);
  res.status(200).json({
    status: "Success",
  });

  next();
});
exports.submitQuiz = catchAsync(async (req, res, next) => {
  // Check if Authorization header exists and is in the correct format
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      status: "Failed",
      message: "Unauthorized",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  // Verify and decode the token
  const decoded = jwt.verify(token, process.env.JWT_Secret);
  const email = decoded.email; // Assuming `email` is stored in the token

  // Ensure the user data exists in the request body
  const data = req.body.data; // Assuming data contains quizID and Score

  if (!data || !data.quizID || data.Score === undefined) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid quiz data",
    });
  }

  // Construct the new quiz result
  const quizResult = {
    quizID: data.quizID,
    Score: data.Score,
    Total: data.total,
    takenAt: new Date(),
  };

  // Check if the user already has results
  const userResult = await Result.findOne({ userID: email });

  if (!userResult) {
    // Create a new result document if no previous result exists
    const newResult = await Result.create({
      userID: email,
      results: [quizResult],
    });
    return res.status(200).json({
      status: "Successful",
      data: {
        result: newResult,
      },
    });
  }

  // If previous results exist, update the results array
  userResult.results.push(quizResult);
  await userResult.save();

  res.status(200).json({
    status: "Successful",
    data: {
      result: userResult,
    },
  });
});

exports.getAnalytics = async (req, res) => {
  try {
    // Extract email from token
    const email =getEmail(req);

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access, invalid token",
      });
    }

    const { year, month } = req.body;

    // Validate year and month
    if (!year || !month) {
      return res.status(400).json({
        success: false,
        message: "Year and month are required",
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // Fetch results from the database
    const results = await Result.aggregate([
      { $match: { userID: email } },
      { $unwind: "$results" },
      {
        $match: {
          "results.takenAt": { $gte: startDate, $lte: endDate },
        },
      },
      {
        $project: {
          _id: 0,
          quizID: "$results.quizID",
          score: "$results.Score",
          total: "$results.Total",
          takenAt: "$results.takenAt",
          percentage: {
            $multiply: [
              { $divide: ["$results.Score", "$results.Total"] },
              100,
            ],
          },
        },
      },
    ]);

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found for the given month and year",
      });
    }

    res.status(200).json({
      success: true,
      data: results,
    });

    console.log(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

  
  

