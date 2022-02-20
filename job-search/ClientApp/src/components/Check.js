
import React, { Component } from 'react';

export class Check extends Component {
    static displayName = Check.name;
    constructor(props) {
        super(props);

        this.state = { collection: [], loading: true };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const response = await fetch('set');
        const data = await response.json();
        this.setState({ collection: data, loading: false });
    }

    render() {
        let contents = this.state.loading
            ? <div>Загрузка</div>
            : <div>{this.state.collection[0]}</div>
        return (
            <div>
                <h2>Мои наборы</h2>
                {contents}
            </div>
        );
    }
}