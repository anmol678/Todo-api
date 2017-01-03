var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNULL: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNULL: false,
		defaultValue: false
	}
});

var User = sequelize.define('user', {
	email: Sequelize.STRING
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
	// force: true
}).then(function() {
	console.log('Everything is synced');

	User.findById(1).then(function(user) {
		user.getTodos({
			where: {
				completed: false
			}
		}).then(function(todos) {
			todos.forEach(function(todo) {
				console.log(todo.toJSON());
			});
		});
	});

	// User.create({
	// 	email: "anmolj678@gmail.com"
	// }).then(function() {
	// 		return Todo.create({
	// 			description: "clean yard"
	// 		});
	// }).then(function(todo) {
	// 	User.findById(1).then(function(user) {
	// 		user.addTodo(todo);
	// 	});
	// });
});



// sequelize.sync({
// 	force: true
// }).then(function() {
// 	console.log('Everything is synced');
// 	Todo.create({
// 		description: 'Walk the dog',
// 		completed: false
// 	}).then(function() {
// 		return Todo.create({
// 			description: 'Pet the dog'
// 		});
// 	}).then(function() {
// 		// return Todo.findById(1);
// 		return Todo.findAll({
// 			where: {
// 				description: {
// 					$like: '%pet%'
// 				}
// 			}
// 		});
// 	}).then(function(todos) {
// 		if (todos) {
// 			todos.forEach(function(todo) {
// 				console.log(todo.toJSON());
// 			});
// 		} else
// 			console.log('No todo found');
// 	}).catch(function(error) {
// 		console.log(error);
// 	});
// });