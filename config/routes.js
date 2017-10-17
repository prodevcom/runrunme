'use strict';



module.exports = function(app){
  // -- Children -- //
    app.get("/children", app.controllers.Children.findAll);
    app.get("/children/find", app.controllers.Children.find);
    app.get("/children/percentage/:villa_id", app.controllers.Children.percentage);

    // -- Partners -- //
      app.get("/partners", app.controllers.Partners.findAll);
      app.get("/partners/search", app.controllers.Partners.find);
};
