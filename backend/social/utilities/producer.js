const { Kafka } = require('kafkajs');
const { initConsumer } = require('./consumer');
const falso = require('falso');

/***************************
 * DO NOT CHANGE THIS FILE *
 ***************************/

const initProducer = async () => {

	const kafka = new Kafka({
		clientId: 'social',
		brokers: ['kafka:9092']
	});

	const admin = kafka.admin();
	const producer = kafka.producer();

	try {

		await admin.connect();

		await admin.createTopics({
			validateOnly: false,
			waitForLeaders: false,
			topics: [
				{ topic: 'event_stream' },
			]
		});

		await producer.connect();

		var tenantIds = [];

		Array.from(Array(10)).map(async () => {
			tenantIds.push(falso.randNumber({ min: 100000, max: 999999 }));
		});

		tenantIds.map(async (id) => {

			await producer.send({
				topic: 'event_stream',
				messages: [
					{
						timestamp: Date.now(),
						key: 'data_stream',
						value: JSON.stringify({
							event_name: 'tenant_created',
							properties: {
								id: id,
								name: falso.randCompanyName(),
								address: falso.randAddress(),
								city: falso.randCity(),
								state: falso.randState(),
								country: falso.randCountry(),
								zip_code: falso.randZipCode(),
								phone: falso.randPhoneNumber(),
								web_url: falso.randDomainName()
							}
						}),
					}
				],

			});

		});

		tenantIds.map(async (id) => {

			await producer.send({
				topic: 'event_stream',
				messages: [
					{
						timestamp: Date.now(),
						key: 'data_stream',
						value: JSON.stringify({
							event_name: 'user_created',
							properties: {
								id: falso.datatype.number({ min: 100000, max: 999999 }),
								first_name: falso.randFirstName(),
								last_name: falso.randLastName(),
								department: falso.randWord(),
								designation: falso.randWord(),
								tenant_id: id,
								image_url: falso.randImg(),
								city: falso.randCity(),
								country: falso.randCountry(),
								bio: falso.randSentence(),
								social_links: {facebook: 'https://facebook.com/'},
								employee_id: falso.randNumber(),
							}
						}),
					}
				],

			});

		});

		await initConsumer();


	} catch (err) {
		console.log('Error ---->', err.message);
	}

};

module.exports = { initProducer };