import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';

import BarChart from './BarChart';
import PieChart from './PieChart';

import {
    getGenreAnalytics,
    getPublishedYearAnalytics,
} from '../../actions/books';

function AnalyticsContainer() {
    const [key, setKey] = useState('barChart');
    const [genreData, setGenreData] = useState([]);
    const [publishedYearData, setPublishedYearData] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenreAnalytics())
            .then((data) => {
                setGenreData(data);
            })
            .catch((e) => {
                console.log(e);
            });

        dispatch(getPublishedYearAnalytics())
            .then((data) => {
                setPublishedYearData(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mx-5 my-5"
        >
            <Tab eventKey="barChart" title="Genre" className="mx-5 my-5">
                <h4 className="chart-title">Breakdown of Books by Genre</h4>
                <PieChart data={genreData} />
            </Tab>
            <Tab
                eventKey="radarChart"
                title="Published Year"
                className="mx-5 my-5"
            >
                <h4 className="chart-title">
                    Breakdown of Books by year published
                </h4>
                <BarChart data={publishedYearData} />
            </Tab>
        </Tabs>
    );
}

export default AnalyticsContainer;
