const categoryModels = require("../models/categoryModels");

// create category controllers
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // validation

    if (!title || !imageUrl) {
      return res.status(500).send({
        success: true,
        message: "Please provide all Fields",
      });
    }
    const newCategory = new categoryModels({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: " new category is added",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " error in createCategory API",
      error,
    });
  }
};

//Get all category controllers
const getAllCategoryControllers = async (req, res) => {
  try {
    const categories = await categoryModels.find({});
    if (!categories) {
      return res.status(404).send({
        success: true,
        message: "category not found",
      });
    }

    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " error in get all category API",
      error,
    });
  }
};

// Update all middleware
const updateCategoryControllers = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModels.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        success: true,
        message: "No category Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "catgory Updated SuccessFully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " error in update category API",
      error,
    });
  }
};

// delete category controllers
const deleteCategoryControllers = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(404).send({
        success: false,
        message: "category id is not  found",
      });
    }

    // if (!restaurantId) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "restaurantId is not found",
    //   });
    // }

    await categoryModels.findByIdAndDelete(categoryId);

    res.status(200).send({
      success: true,
      message: " Category deleted SuccessFully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " error in delete category API",
      error,
    });
  }
};
module.exports = {
  createCategoryController,
  getAllCategoryControllers,
  updateCategoryControllers,
  deleteCategoryControllers,
};
