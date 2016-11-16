import React from 'react';

export class Timer extends React.Component {
	constructor(props) {
		super(props);

		this.state = { date: new Date() };
	}

	componentDidMount() {
		this.timer = setInterval(() => this.tick(),	1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	tick() {
		this.setState({	date: new Date() });
	}

	render() {
		return (
			<div style={{ color: '#e77', textAlign: 'center' }}>
				{this.state.date.toLocaleTimeString()}
			</div>
		);
	}
}

export default Timer;
