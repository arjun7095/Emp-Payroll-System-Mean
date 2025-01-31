const express = require("express");
const EmployeesModel = require('./model/emp-model');
const WorkSchedule = require('./model/work-model');
const Leaves = require('./model/leaves-model');
const TimeSheet = require('./model/timesheet-model');
const SalaryModel = require('./model/salary-model');
const router = express.Router();
router.use(express.json());
const { check, validationResult } = require('express-validator');



// ====================================================================================================================
//                           AdminDashboard
// ====================================================================================================================
router.get("/employees", async function (req, res) {

  let result = await EmployeesModel.find({}).exec();
 
  try {
      console.log("[Read All] - No. of  items get from database : " + result.length);
      res.send(result);
  }
  catch (error) {
      // sending error details to client
      res.status(500).send(error);    
  }
});


// Update
router.put('/employees',  async function (req,res)
{ 
      var EmpObj  = {};
      EmpObj.empId = parseInt(req.body.empId);
      EmpObj.name =  req.body.name;
      
      EmpObj.category =req.body.category;
      
      EmpObj.address = req.body.address;

      // Logic to insert new dept in database
      let resResult  = await  EmployeesModel.findOneAndUpdate(  {empId:EmpObj.empId},   {  $set : EmpObj});

  var result = {};
  result.status  = "Record updated in Database";
  console.log("[Update] - Record updated in Database");
  res.send(result);	
});

// Delete
router.delete('/employees/:empId',async function (req,res)
{  
  var eno =  req.params.empId;   
  let resResult  =  await  EmployeesModel.findOneAndDelete({ empId: eno}); 

var result = {};
result.status  = "Record deleted from Database";
console.log("[Delete] - Record deleted from Database");
res.send(result);
     
});

// ====================================================================================================================
//                           WorkSchedule
// ====================================================================================================================
router.post('/assign', [
  check('empId').notEmpty().withMessage('Employee ID is required'),
  check('work').notEmpty().withMessage('Work details are required'),
  check('date').isDate().withMessage('Invalid date format')
], async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if date is today or a future date
  const today = new Date();
  const scheduleDate = new Date(req.body.date);
  if (scheduleDate < today) {
    return res.status(400).json({ error: 'Cannot schedule work for past dates' });
  }
  
  try {
    // Create and save work schedule
    const workSchedule = new WorkSchedule({
      empId: req.body.empId,
      work: req.body.work,
      date: scheduleDate
    });
 
    let resResult  =  await  EmployeesModel.findOne({ empId: workSchedule.empId});
    if(!resResult){
      res.status(201).json({ message: 'There is no employee matching with given employee Id' });
    }
    else{
    await workSchedule.save();
    console.log('work-assigned')
    res.status(201).json({ message: 'Work assigned successfully' });
    }
  } catch (error) {
    console.error('Error assigning work:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get work schedule details by date
router.get('/:date', async (req, res) => {
  const date=req.body;
  try {
  ;
    
    const workSchedule = await WorkSchedule.find( date );
    res.json({ workSchedule });
  } catch (error) {
    console.error('Error fetching work schedule:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// ====================================================================================================================
//                          Leaves
// ====================================================================================================================

router.get('/new/leaves', async function (req, res) {
  let leaveRequests = await Leaves.find({}).exec();
  try {
    console.log("[Read All] - No. of  items get from database : " + leaveRequests.length);
    res.send( leaveRequests );
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
});

// Update leave request status
router.put('/leaves/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body;

    // Find leave request by ID and update status
    const updatedRequest = await Leaves.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    res.json({ message: 'Leave request status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leave request status' });
  }
});


// ====================================================================================================================
//                              TimeSheet
// ====================================================================================================================

router.get('/timesheet/:date', async (req, res) => {
  const date=req.params;
  console.log(date)
  try {
    const timeSheetData = await TimeSheet.find(date);
    res.json({ timeSheetData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch time sheet data' });
  }
});


// ====================================================================================================================
//                              Salary
// ====================================================================================================================




// Get salary data for a specific month and year
router.get('/salary/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  try {
    // Query the database to find salary data for the specified year and month
    const filteredSalaryData = await SalaryModel.find({ year, month });
    if (filteredSalaryData.length === 0) {
      return res.status(404).json({ error: 'No salary data found for the specified year and month.' });
    }
    res.json({ salaryData: filteredSalaryData });
  } catch (error) {
    console.error('Error fetching salary data:', error);
    res.status(500).json({ error: 'An error occurred while fetching salary data.' });
  }
});

// Add salary for an employee
router.post('/salary/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  const { empId,name, salary } = req.body;

  try {
    const newSalary = new SalaryModel({ empId,name, year, month, salary });
    await newSalary.save();
    res.status(201).json({ message: 'Salary added successfully.' });
  } catch (error) {
    console.error('Error adding salary:', error);
    res.status(500).json({ error: 'An error occurred while adding salary.' });
  }
});

// Update salary for an employee
router.put('/salary/:empId/:year/:month', async (req, res) => {
  const { empId, year, month } = req.params;
  const { salary } = req.body;

  try {
    await SalaryModel.findOneAndUpdate({ empId, year, month }, { salary });
    res.status(200).json({ message: 'Salary updated successfully.' });
  } catch (error) {
    console.error('Error updating salary:', error);
    res.status(500).json({ error: 'An error occurred while updating salary.' });
  }
});

// Delete salary for an employee
router.delete('/salary/:empId/:year/:month', async (req, res) => {
  const { empId,year, month } = parseInt(req.params);
  
  await SalaryModel.findOneAndDelete(empId,year,month);
  
  res.json({ message: 'Salary deleted successfully' });
});


// ====================================================================================================================
//                              TimeSheet
// ====================================================================================================================
router.get('/timesheet/:date', async (req, res) => {
  const { date } = req.params;

  try {
    // Find all timesheets for the given date
    const timesheets = await TimeSheet.find({ date });

    // If no timesheets found for the given date, return a 404 error
    if (timesheets.length === 0) {
      return res.status(404).json({ message: 'No timesheets found for the given date' });
    }

    // Return the timesheets as a response
    res.status(200).json({ timesheets });
  } catch (error) {
    console.error('Error fetching timesheet data:', error);
    res.status(500).json({ error: 'An error occurred while fetching timesheet data' });
  }
});






module.exports = router;