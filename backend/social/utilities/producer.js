const { Kafka } = require('kafkajs');
const { initConsumer } = require('./consumer');
const falso = require('@ngneat/falso');

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
								zipCode: falso.randZipCode(),
								phone: falso.randPhoneNumber(),
								webUrl: falso.randDomainName()
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
								id: falso.randNumber({ min: 100000, max: 999999 }),
								firstName: falso.randFirstName(),
								lastName: falso.randLastName(),
								department: falso.randWord(),
								designation: falso.randWord(),
								tenantId: id,
								imageUrl: falso.randImg(),
								city: falso.randCity(),
								country: falso.randCountry(),
								bio: falso.randSentence(),
								socialLinks: {facebook: 'https://facebook.com/'},
								employeeId: falso.randNumber(),
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