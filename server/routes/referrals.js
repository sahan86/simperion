const router = require('express').Router();
let Referral = require('../models/referral.model');
const auth = require('../middleware/auth');

router.route('/').get(auth, (req, res) => {
  Referral.find({ referrer: req.user })
    .then(referrals => res.json(referrals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(auth, (req, res) => {
  const { job, candidate_name, candidate_email } = req.body;
  const referrer = req.user;

  const newReferral = new Referral({
    job,
    referrer,
    candidate_name,
    candidate_email,
  });

  newReferral.save()
    .then(() => res.json('Referral added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(auth, (req, res) => {
  Referral.findById(req.params.id)
    .then(referral => {
      referral.status = req.body.status;

      referral.save()
        .then(() => res.json('Referral updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
