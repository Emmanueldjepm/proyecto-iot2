const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const connectDB = require('./database')

// Initializations
const app = express();

connectDB();

require('./config/passport');
// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
// Video 2:45:00
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Global Variables
app.use((req, res, next) => {
    // Video FaztWeb -> 01:57:00
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    // 2:49:30
    res.locals.error = req.flash('error');
    // 3:09:00
    res.locals.user = req.user || null;
    next();
});
// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
app.use(require('./routes/monitoring'));
// Static Files
app.use(express.static(path.join(__dirname, 'public')));
// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
