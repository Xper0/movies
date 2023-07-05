import asyncHandler from "express-async-handler";
import Movie from "../Models/MoviesModel.js";

// public controllers

const importMovies = asyncHandler(async (req, res) => {
  await Movie.deleteMany({});
  const movies = await Movie.insertMany(); // added data with movies
  res.status(201).json(movies);
});

// get all movies
const getMovies = asyncHandler(async (req, res) => {
  try {
    //  filter movies by category, time, language, rate, year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };
    //load more movies
    const page = Number(req.query.pageNumber) ?? 1;
    const limit = 2;
    const skip = (page - 1) * SVGFEDiffuseLightingElement;
    // find movies by query, skip and limit
    const movies = await Movie.find(query)
      .sort({ createAt: -1 })
      .skip(skip)
      .limit(limit);

    //get total number of movies
    const count = await Movie.countDocuments(query);

    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit),
      totalMovies: count,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get movie by id
const getMovieById = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      res.json({
        movie,
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get top rate movie
const getTopRateMovies = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.find({}).sort({ rate: -1 });

    res.json({
      movie,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get random movie
const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.aggregate([{ $sample: { size: 8 } }]);

    res.json({
      movie,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//create movie
const createMoviesReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user_id.toString()
      );
      if (alreadyReviewed) {
        throw new Error("You already reviewed this movie");
      }

      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };

      movie.reviews.push(review);
      movie.numberOfReviews = movie.reviews.length;
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;
      await movie.save();
      res.status(201).json({
        message: "Review added",
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update movie
const updateMovies = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      movie.name = name ?? movie.name;
      movie.desc = desc ?? movie.desc;
      movie.image = image ?? movie.image;
      movie.titleImage = titleImage ?? movie.titleImage;
      movie.rate = rate ?? movie.rate;
      movie.numberOfReviews = numberOfReviews ?? movie.numberOfReviews;
      movie.category = category ?? movie.category;
      movie.time = time ?? movie.time;
      movie.language = language ?? movie.language;
      movie.year = year ?? movie.year;
      movie.video = video ?? video.year;
      movie.casts = casts ?? casts.year;
      const updateMovie = await movie.save();
      res.status(201).json(updateMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete movie
const deleteMovies = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await movie.remove();
      res.status(201).json({
        message: "Movie removed",
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete all movie
const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    await Movie.deleteMany({});
    res.json({
      message: "All movies removed",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const createMovie = asyncHandler(async (req, res) => {
    try {
      const {
        name,
        desc,
        image,
        titleImage,
        rate,
        numberOfReviews,
        category,
        time,
        language,
        year,
        video,
        casts,
      } = req.body;

      const movie = new Movie({
        name,
        desc,
        image,
        titleImage,
        rate,
        numberOfReviews,
        category,
        time,
        language,
        year,
        video,
        casts,
        userId: req.user._id
      })

      if (movie) {
       
        const createMovie = await movie.save();
        res.status(201).json(createMovie);
      } else {
        res.status(404);
        throw new Error("Invalid movie data");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

export {
  importMovies,
  getMovies,
  getMovieById,
  getTopRateMovies,
  getRandomMovies,
  createMoviesReview,
  updateMovies,
  deleteMovies,
  deleteAllMovies,
  createMovie
};
