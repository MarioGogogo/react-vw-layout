import React,{Component} from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Loading extends Component{
  constructor(props){
    super(props)
    this.el = document.createElement('div');
  }
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  showLoading = () => {
     alert('加载弹框出现把啦啦啦')
  };
  dismissLoading = () => {
    alert('321')
  };



  child(){
    return (
      <div className="modal">
        <button>正在加载中</button>
      </div>
    );
  }

  render(){
     return ReactDOM.createPortal(
       <Child/>,
       this.el,
     );
   }
}

function  Child(){
  return (
    <div className="modal">
      <button>正在加载中</button>
    </div>
  );
}




export default Loading;

