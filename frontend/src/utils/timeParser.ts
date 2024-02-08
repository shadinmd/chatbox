import moment from 'moment';

function parseTime(time: Date) {
	const currentTime = moment();
	const timestamp = moment(time);

	const duration = moment.duration(currentTime.diff(timestamp));

	if (duration.asSeconds() < 60) {
		return `${Math.floor(duration.asSeconds())}s ago`;
	} else if (duration.asMinutes() < 60) {
		return `${Math.floor(duration.asMinutes())}m ago`;
	} else if (duration.asHours() < 24) {
		return `${Math.floor(duration.asHours())}h ago`;
	} else if (duration.asDays() < 30) {
		return `${Math.floor(duration.asDays())}d ago`;
	} else if (duration.asMonths() < 12) {
		return `${Math.floor(duration.asMonths())}month ago`;
	} else {
		return `${Math.floor(duration.asYears())}year ago`;
	}
}

export default parseTime
