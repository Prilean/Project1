const { timeStamp } = require('console');
const schema = require('mongoose');

const student_schema = schema.Schema(
    {
        student_id: {type: Number},
        name: {type: String},
        email_id: {type: String},
        password: {type: String},
    },
    {
        timestamps: true
    }
);
module.exports = schema.model('student_collections', student_schema);