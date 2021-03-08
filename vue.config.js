module.exports = {
  /*
	"rules": {
		"no-mixed-spaces-and-tabs": 0, // disable rule
	  },*/
	publicPath: "/mobile/",
	outputDir:"mobile",
	assetsDir:"mobileassets",
	devServer: {
		host: '0.0.0.0',
		port: '443',
		disableHostCheck : true,
	}

}