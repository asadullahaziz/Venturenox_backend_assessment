const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const processMessage = async (kafkaMessage) => {

	//Start working here
	// console.log(kafkaMessage);
	
	if(kafkaMessage.event_name == "tenant_created") {
		try {
			await prisma.tenant.create({
				data: kafkaMessage.properties
			});
		}
		catch(error) {
			console.log(error);
		}
	}
	else if (kafkaMessage.event_name == "user_created") {
		try {
			await prisma.user.create({
				data: kafkaMessage.properties
			});
		}
		catch(error) {
			console.log(error);
		}
	}

};

module.exports = { processMessage };