var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: 'do laundry',
	completed: false
}, {
	id: 2,
	description: 'organise music',
	completed: false
}, {
	id: 3,
	description: 'watch movie',
	completed: true
}];

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
	res.json(todos);
});

// app.get('/todos/:id')
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;

	todos.forEach(function (todo) {
		if (todo.id === todoId)
			matchedTodo = todo;
	});

	if (!matchedTodo)
		res.status(404).send();
	else
		res.json(matchedTodo);
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});