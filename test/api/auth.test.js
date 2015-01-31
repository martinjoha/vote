var request = require('supertest');
var chai = require('chai');
var app = require('../../app');
var should = chai.should();
var User = require('../../app/models/user');

describe('Auth API', function() {
    var testUser = {
        username: 'test',
        password: 'test121312313'
    };

    var badTestUser = {
        username: 'test',
        password: 'notthecorrectpw'
    };

    beforeEach(function() {
        return User.removeAsync({})
        .then(function() {
            return User.registerAsync(testUser, testUser.password);
        });
    });

    it('should be able to authenticate users', function(done) {
        request(app)
            .post('/auth/login')
            .send(testUser)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                should.exist(res.body.username, 'should return a username');
                should.not.exist(res.body.password, 'password should not be returned');
                done();
            });
    });

    it('should deny users with bad credentials', function(done) {
        request(app)
            .post('/auth/login')
            .send(badTestUser)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
});
