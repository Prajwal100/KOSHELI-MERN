import { body, param } from "express-validator";

const adminValidator = {
  addSliderValidator: [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Slider name is required.")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters")
      .isLength({ max: 100 })
      .withMessage("Name must have maximum length of 100 characters."),

    body("status")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Status field is required.")
      .isIn(["active", "inactive"])
      .withMessage("Please select status options."),
  ],
  addCategoryValidator: [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Category name is required.")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Category name must be at least 2 characters"),
    body("status")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Status field is required.")
      .isIn(["active", "inactive"])
      .withMessage("Please select status options."),
  ],
  addSubCategoryValidator: [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .withMessage("SubCategory name is required.")
      .isString()
      .isLength({ min: 2 })
      .withMessage("SubCategory name must be at least 2 characters"),
    body("category")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Category field is required."),
    body("status")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Status field is required.")
      .isIn(["active", "inactive"])
      .withMessage("Please select status options."),
  ],
  addBrandValidator: [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Brand name is required."),
     
    body("status")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Status field is required.")
      .isIn(["active", "inactive"])
      .withMessage("Please select status options."),
  ],
  addProductValidator: [
    body("name")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Product name is required.")
      .isString()
      .isLength({ min: 2 })
      .withMessage("Product name must be at least 2 characters")
      .isLength({max:100})
      .withMessage("Product name must be max 100 characters."),

      body("category")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Category field is required."),
      body("brand")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Brand field is required."),
      body("quantity")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Quantity field is required.")
      .isInt()
      .withMessage("Quantity field must be numeric."),
      body("price")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Price field is required.")
      .isNumeric()
      .withMessage("Price field must be numeric."),
     
    body("status")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Status field is required.")
      .isIn(["active", "inactive"])
      .withMessage("Please select status options."),
  ],
  
  
  
};

export default adminValidator;
