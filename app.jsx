let PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1,
  },
   {
    name: "Andree Hoskins",
    score: 35,
    id: 2,
  },
   {
    name: "Alena Hoskins",
    score: 42,
    id: 3,
  },
];

class Model {
  constructor(players){
    this.players = players;
    this.inputValue = null;
  }

  subscribe(render){
    this.callback = render;
  }
  notify(){
    this.callback();
  }
  getPlayer(contenido){
    this.layers.push({
      name: contenido.value,
      score: 0,
      id: this.players.length + 1
    })

    contenido.value = '';
    this.notify();
  }
  getSum(player){
    player.score++;
    this.notify();
  }
  getRest(player){
    player.score--;
    this.notify();
  }
  getAllPoints(){
    return this.players.map(item => item.score).reduce((total, item) => total + item);
  
    /*function AllPoints(players){
      return players.map(player => player.score).reduce((a, b) => a + b);
    }*/
  }
}

const Application = ({title, model}) => {
   return (
     <div className="container scoreboard">
        <Header model={model}/>
        <PlayerList model={model}/>
        <PlayerForm model = {model}/>  
     </div>
  );
}

const Header = ({model}) => {
  return(
      <header className="header">
        <table className="stats">
            <tr>
              <td>PLAYERS:</td>
              <td>{model.players.length}</td>
            </tr>
            <tr>
              <td>TOTAL POINTS:</td>
              <td>{model.getAllPoints()}</td>
            </tr>
        </table>
        <div className="scoreTitle">SCOREBOARD</div>
        <div className="stopwatch">
            <h2>STOPWATCH</h2>
            <h1 className="stopwatch-time">0</h1>
            <button>start</button>
            <button>reset</button>
        </div>
      </header>
  );
}



const PlayerList = ({players}) => {
  return (
    <div>
      {
        players.map((e) => {
          return <div className='player' key={e.id}>
            <div className='player-name'>{e.name}</div>
            <div className='player-score counter'>
              <button className='counter-action decrement' onClick={e.score ? () => model.getRest(e):''}>-</button>
              <span className='counter-score'>{e.score}</span>
              <button className='counter-action increment'onClick={e.score ? () => model.getSum(e):''}>+</button>
            </div>
          </div>
        })
      }
    </div>
  );
}

const PlayerForm = ({model}) => {
  return (
    <div className="add-player-form">
      <form action="" onSubmit={e => {e.preventDefault();
      model.getPlayer(model.inputValue);
      }}
      >
        <input type="text" placeholder="Enter a name" onChange={e => (model.inputValue = e.target)}/>
        <input type="submit" placeholder="Add Player"/>
      </form>
    </div>
  )
}

let model = new Model(PLAYERS);

let render = () =>{
  ReactDOM.render(<Application title="Scoreboard" model = {model}/>,
  document.getElementById('container'));
}

model.subscribe(render);
render();

