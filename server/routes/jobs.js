const router = require('express').Router();
let Job = require('../models/job.model');
const auth = require('../middleware/auth');

router.route('/').get((req, res) => {
  Job.find()
    .then(jobs => res.json(jobs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(auth, (req, res) => {
  const { title, description, company, location, salary } = req.body;
  const employer = req.user;

  const newJob = new Job({
    title,
    description,
    company,
    location,
    salary,
    employer,
  });

  newJob.save()
    .then(() => res.json('Job added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Job.findById(req.params.id)
    .then(job => res.json(job))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(auth, (req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.json('Job deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(auth, (req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      job.title = req.body.title;
      job.description = req.body.description;
      job.company = req.body.company;
      job.location = req.body.location;
      job.salary = req.body.salary;

      job.save()
        .then(() => res.json('Job updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
