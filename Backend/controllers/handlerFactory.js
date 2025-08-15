const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(204).json({
            status: "success",
            data: null,
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        // Upload imageCover if available
        if (req.files?.imageCover) {
            const result = await cloudinary.uploader.upload(req.files.imageCover.tempFilePath);
            req.body.imageCover = result.secure_url;
        }

        // Upload multiple images if available
        if (req.files?.images) {
            const images = Array.isArray(req.files.images)
                ? req.files.images
                : [req.files.images];

            const uploadResults = await Promise.all(
                images.map((img) => cloudinary.uploader.upload(img.tempFilePath))
            );

            req.body.images = uploadResults.map((r) => r.secure_url);
        }

        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        try {
            console.log("req.files:", req.files);

            // Upload to Cloudinary if file exists
            if (req.files && (req.files.imageEvent || req.files.imageCover)) {
                const file = req.files.imageEvent || req.files.imageCover; // accept either field
                const result = await cloudinary.uploader.upload(
                    file.tempFilePath,
                    {
                        folder: Model.modelName.toLowerCase(), // put in folder by model type
                        use_filename: true,
                        timeout: 60000
                    }
                );
                console.log("Cloudinary upload result:", result);

                // Assign the right field depending on model
                if (Model.modelName === "Event") {
                    req.body.imageEvent = result.secure_url;
                } else {
                    req.body.imageCover = result.secure_url;
                }
            }

            console.log("req.body before create:", req.body);

            // Create document
            const doc = await Model.create(req.body);

            res.status(201).json({
                status: "success",
                data: { data: doc },
            });

        } catch (err) {
            console.error("Error in createOne:", err);
            next(err);
        }
    });


exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        if (!doc) {
            return next(new AppError("No document found with that ID", 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

exports.getAll = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };

        let query = Model.find(filter);
        const features = new APIFeatures(query, req.query)
            .filter()
            .sort()
            .paginate();

        if (popOptions) {
            features.query = features.query.populate(popOptions);
        }

        const doc = await features.query;

        res.status(200).json({
            status: "success",
            results: doc.length,
            doc,
        });
    });
