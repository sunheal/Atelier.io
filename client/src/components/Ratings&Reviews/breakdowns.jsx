import React from "react"

  
  class BarChart extends React.Component {
      constructor(props) {
        super(props);
      }
    
    
  
    render() {
        return (
            <div> 
            <svg height='30' width="300"> 
                <text className="name-label" x="0" y="15">5 Stars</text>
                <rect className='grey' width='100' height='10' x='90' y='5'fill="grey" opacity='0.25'/>
                <rect className='green' width='60' height='10'  x='90' y='5' fill="green" />
            </svg>
            <svg height='30' width="300"> 
                <text className="name-label" x="0" y="15">4 Stars</text>
                <rect className='grey' width='100' height='10' x='90' y='5'fill="grey" opacity='0.25'/>
                <rect className='green' width='60' height='10'  x='90' y='5' fill="green"/>
            </svg>
            <svg height='30' width="300"> 
                <text className="name-label" x="0" y="15">3 Stars</text>
                <rect className='grey' width='100' height='10' x='90' y='5'fill="grey" opacity='0.25'/>
                <rect className='green' width='60' height='10'  x='90' y='5' fill="green"/>
            </svg>
            <svg height='30' width="300"> 
                <text className="name-label" x="0" y="15">2 Stars</text> 
                <rect className='grey' width='100' height='10' x='90' y='5'fill="grey" opacity='0.25'/>
                <rect className='green' width='60' height='10'  x='90' y='5' fill="green"/>
            </svg>
            <svg height='30' width="300"> 
                <text className="name-label" x="0" y="15">1 Stars</text>
                <rect className='grey' width='100' height='10' x='90' y='5'fill="grey" opacity='0.25'/>
                <rect className='green' width='60' height='10'  x='90' y='5' fill="green"/>
            </svg>

            </div>
            
        )
    }

  }
export default BarChart;