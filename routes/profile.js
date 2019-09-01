const express = require("express");
const { Profile } = require("../models/profile");
const router = express.Router();

router.get("/list", async (req, res) => {
  const profiles = await Profile.find({});
  res.send(profiles);
});

router.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  const profiles = await Profile.find({
    $or: [
      { firstName: new RegExp(query, "i") },
      { lastName: new RegExp(query, "i") }
    ]
  })
    .limit(5)
    .select({
      firstName: () => {
        if (firstName) return firstName;
      },
      lastName: () => {
        if (lastName) return lastName;
      },
      city: () => {
        if (city) return city;
      },
      state: () => {
        if (state) return state;
      },
      country: () => {
        if (country) return country;
      },
      profileImg: () => {
        if (profileImg) return profileImg;
      }
    });
  res.send(profiles);
});

router.put("/add-superpower/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const profile = await Profile.findById(userId);
  const profileSuperPowers = profile.superpowers;
  profile.superpowers = [...profileSuperPowers, { name }];
  profile.save();
  const data = profile.superpowers[profile.superpowers.length - 1];
  res.send(data);
});

router.put("/add-weakness/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const profile = await Profile.findById(userId);
  const profileWeaknesses = profile.weaknesses;
  profile.weaknesses = [...profileWeaknesses, { name }];
  profile.save();
  const data = profile.weaknesses[profile.weaknesses.length - 1];
  res.send(data);
});

router.delete("/delete-weakness/:profileId/:charId", async (req, res) => {
  const { profileId, charId } = req.params;
  console.log(charId);
  const profile = await Profile.findOne({ _id: profileId });
  profile.weaknesses = profile.weaknesses.filter(wn => wn._id != charId);
  profile.save();
  res.send(true);
});

router.delete("/delete-superpower/:profileId/:charId", async (req, res) => {
  const { profileId, charId } = req.params;
  console.log(charId);
  const profile = await Profile.findOne({ _id: profileId });
  profile.superpowers = profile.superpowers.filter(wn => wn._id != charId);
  profile.save();
  res.send(true);
});

router.put("/update-socail-media/:userId", async (req, res) => {
  const { userId } = req.params;
  const { facebook, instagram, twitter, linkedIn } = req.body;

  await Profile.findByIdAndUpdate(userId, {
    facebook,
    instagram,
    twitter,
    linkedIn
  });

  res.send(true);
});

router.put("/update-profile/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const {
    profileImg,
    firstName,
    lastName,
    city,
    state,
    country,
    primaryEmail,
    email,
    primaryPhone,
    phone,
    bio,
    facebook,
    instagram,
    twitter,
    linkedIn
  } = req.body;

  await Profile.findByIdAndUpdate(userId, {
    profileImg,
    firstName,
    lastName,
    city,
    state,
    country,
    primaryEmail,
    email,
    primaryPhone,
    phone,
    bio,
    facebook,
    instagram,
    twitter,
    linkedIn
  });

  res.send(true);
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(req.params);
  const profile = await Profile.findById(userId);
  console.log(profile);
  res.send(profile);
});

router.post("/", async (req, res) => {
  const {
    profileImg,
    firstName,
    lastName,
    city,
    state,
    country,
    primaryEmail,
    email,
    primaryPhone,
    phone,
    bio,
    facebook,
    instagram,
    twitter,
    linkedIn
  } = req.body;
  const profile = new Profile({
    profileImg,
    firstName,
    lastName,
    city,
    state,
    country,
    primaryEmail,
    email,
    primaryPhone,
    phone,
    bio,
    facebook,
    instagram,
    twitter,
    linkedIn
  });
  try {
    await profile.save();
    res.send(profile._id);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.send(err);
  }
});

module.exports = router;
