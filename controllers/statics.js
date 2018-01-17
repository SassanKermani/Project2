
/********************
 * GET FOR PASSPORT *
 ********************/

function home(req, res) {  
  res.render('login.ejs');
}; 

module.exports = {
  home: home,
};
