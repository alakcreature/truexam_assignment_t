const express=require("express");
const app=express();
var cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerui=require("swagger-ui-express");
require("dotenv").config();

app.use(cors());


// Extended : https://swagger.io/specification/#infoObject
const swaggerOptions={
    swaggerDefinition:{
      info:{
        title:"Online Image Editing Bootcamp API.",
        version:'1.0.0',
        description:" API Info",
        servers:["http://localhost:5000","https://assignment-shubh.herokuapp.com/api-docs/"]
      }
    },
    basePath: '/',
    components:{
      securitySchemes:{
        bearerAuth:{
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    apis: ["app.js"]
  }

  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  app.use("/api-docs",swaggerui.serve,swaggerui.setup(swaggerDocs));


  app.get("/",(req,res,next)=>{
    res.send("Kindly go to route /api-docs to see documentation.")
  })
//Schemas
/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       email:
 *         type: string
 *         required: true
 *       password:
 *         type: string
 *         required: true
 *       user_type:
 *         type: string
 *       category:
 *         type: string
 *   
 *   Task:
 *      properties:
 *        questionImg:
 *          type: string
 *        answerImg:
 *          type: string
 *        grades:
 *          type: number
 *        createdby:
 *          type: string
 *          ref: "User"
 *        createdfor:
 *          type: string
 *          ref: "User"
 */


//Routes

//Signup for new user.
/**
 * @swagger
 * /signup:
 *  post:
 *    tags:
 *      - User
 *    description: Creates New User.
 *    parameters:
 *       - name: email
 *         description: User email id.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: User password.
 *         in: formData
 *         required: true
 *    schema:
 *       $ref: "#/definitions/User"
 *    responses:
 *        '201':
 *          description: A successfull response with "User Created".
 *        '208':
 *          description: User already exists. 
 *        '500':
 *          description: Server Error.   
 */

//Login for existing user.
/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *      - User
 *    description: Login Existing User (Student or Instructor).
 *    parameters:
 *       - name: email
 *         description: User email id.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: User password.
 *         in: formData
 *         required: true
 *    schema:
 *       $ref: "#/definitions/User"
 *    responses:
 *        '201':
 *          description: A successfull response with "User Logged In". 
 *        '401':
 *          description: Password Invalid.   
 */

//To fetch loggedin user


//Category
/**
 * @swagger
 * /setcategory:
 *  post:
 *    tags:
 *      - User
 *    security:
 *      - bearerAuth: []
 *    description: Set Category for logged-in Student.
 *    parameters:
 *       - name: category
 *         description: Select any of three - beginner, intermediate, advanced.
 *         in: formData
 *         required: true
 *    schema:
 *       $ref: "#/definitions/User"
 *    responses:
 *        '200':
 *          description: Category Added. 
 *        '500':
 *          description: Server Error.   
 */


//To fetch all students
/**
 * @swagger
 * /fetchallstudents:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Logged-in Instructor can fetch all the students in order to assign a task.
 *    schema:
 *       $ref: "#/definitions/User"
 *    responses:
 *        '200':
 *          description: Fetched all students successfully (An array of students). 
 *        '500':
 *          description: Server Error.   
 */


//To create a task.
/**
 * @swagger
 * /createtask:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    description: Create task for particular student by logged-in Instructor.
 *    consumes:
 *       - multipart/form-data
 *    parameters:
 *       - name: questionImage
 *         in: formData   
 *         description: The uploaded file data
 *         required: true
 *         type: file
 *       - name: createdfor
 *         in: formData
 *         description: Select student to which instructor wants to assign task and send their _id.
 *         required: true
 *    responses:
 *        '200':
 *          description: Task Created. 
 *        '500':
 *          description: Server Error.   
 */


//To fetch all given tasks.
 /**
 * @swagger
 * /fetchtask:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Depending on category of logged-in user, this api will behave accordingly if it's Instructor or Student.
 *    schema:
 *       $ref: "#/definitions/Task"
 *    responses:
 *        '200':
 *          description: Successfully Fetches list of task assigned to students. (If it is a Instructor.)
 *        '207':
 *          description: Successfully Fetches list of assigned task by Instructor. (if it is a Student.)
 *        '500':
 *          description: Server Error.   
 */

 //To submit task.
 /**
 * @swagger
 * /submittask:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    description: Depending on category of logged-in user, this api will behave accordingly if it's Instructor or Student.
 *    consumes:
 *       - multipart/form-data
 *    parameters:
 *       - name: answerImage
 *         in: formData   
 *         description: The uploaded file data by user(student).
 *         type: file
 *    schema:
 *       $ref: "#/definitions/Task"
 *    responses:
 *        '200':
 *          description: Successfully submitted the task. (if it is a Student.)
 *        '500':
 *          description: Server Error.   
 */

/**
 * @swagger
 * /grade:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    description: If logged-in user is Instructor, then they can update the grades of a task given to student.
 *    parameters:
 *       - name: grade
 *         in: formData   
 *         description: Grade must be between 1-5.
 *    schema:
 *       $ref: "#/definitions/Task"
 *    responses:
 *        '200':
 *          description: Successfully updated the grade.
 *        '500':
 *          description: Server Error.   
 */


  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      error: {
        message: error.message
      }
    });
  });


const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server started at ${port}`))