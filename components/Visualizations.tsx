import React from 'react';
import Plot from 'react-plotly.js';
import jsonData from '@/data.json'

const Visualizations = () => {
    // Parse the 'fig' key which is a string into an actual object
    const plotData = JSON.parse(jsonData.fig);

    return (
        <div>
            <Plot
                data={plotData.data}
                layout={plotData.layout}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
};

export default Visualizations;