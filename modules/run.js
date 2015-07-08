define(['modules/admin.js','modules/dashboard.js','jQuery'], function(Admin, Board, $) {
    var dashboard = new Board(), // from function
        admin = Admin; // from object

    console.log('execute main function');
    console.log( $(document) );
    console.log( dashboard.isActive() );
    console.log( Admin.getRoleDescription() );
});