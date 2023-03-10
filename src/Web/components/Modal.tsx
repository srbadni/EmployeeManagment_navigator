import {Component} from "react";
import ReactDOM from "react-dom";
const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
    private readonly el: HTMLDivElement;

    constructor(props: any) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        // @ts-ignore
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        // @ts-ignore
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}
