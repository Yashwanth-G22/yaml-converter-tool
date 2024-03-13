
import { connect } from 'react-redux';
import { IncAction, DecAction } from './store/actions';

function App({ variable, IncAction, DecAction }: { variable: any, IncAction: any, DecAction: any }) {
  return (
    <>
      <h3>Hlo</h3>
      <h2>{variable}</h2>
      <button onClick={() => IncAction(10)}>Increment</button>
      <button onClick={() => DecAction(7)}>Decrement</button>
      <button onClick={() => DecAction(7)}>Decrement</button>
      <button onClick={() => DecAction(1)}>Decrement</button>
      <button onClick={() => DecAction(7)}>Decrement</button>
    </>
  );
}

const mapStateToProps = (state: { state: any }) => ({
  variable: state
})
export default connect(mapStateToProps, { IncAction, DecAction })(App);
