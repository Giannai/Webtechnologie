const password = '123456';
const saltRounds = 10;

//Hashing a password
const hash = bcrypt.hash(password, saltRounds, function(err, hash){

});

// Checking a hash
const check = bcrypt.compare(password, hash, function(err, hash){

});