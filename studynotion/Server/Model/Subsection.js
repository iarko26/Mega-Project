const mongoose = require('mongoose');
const SubsectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
    },
    // Fix field name from 'vidoeurl' to 'videoUrl' for consistency
    videoUrl: {
        type: String,
    }
});
module.exports = mongoose.model('Subsection', SubsectionSchema);