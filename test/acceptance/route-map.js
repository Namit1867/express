
var request = require('supertest')
  , app = require('../../examples/route-map');

describe('route-map', function(){
  describe('GET /users', function(){
    it('should respond with users', function(done){
      request(app)
      .get('/users')
      .expect('user list', done);
    })
  })

  describe('DELETE /users', function(){
    it('should delete users', function(done){
      request(app)
      .del('/users')
      .expect('delete users', done);
    })
  })

  describe('GET /users/:id', function(){
    it('should get a user', function(done){
      request(app)
      .get('/users/12')
      .expect('user 12', done);
    })
  })

  describe('GET /users/:id/pets', function(){
    it('should get a users pets', function(done){
      request(app)
      .get('/users/12/pets')
      .expect('user 12\'s pets', done);
    })
  })

  describe('GET /users/:id/pets/:pid', function(){
    it('should get a users pet', function(done){
      request(app)
      .del('/users/12/pets/2')
      .expect('delete 12\'s pet 2', done);
    })
  })
})



app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// Placeholder users
var users = [
  { name: 'tobi', email: 'tobi@learnboost.com' },
  { name: 'loki', email: 'loki@learnboost.com' },
  { name: 'jane', email: 'jane@learnboost.com' }
];

app.get('/', function(req, res){
  res.render('users', {
    users: users,
    title: "EJS example",
    header: "Some users"
  });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
