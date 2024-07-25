import { Modal } from "./components";

function App() {
  return (
    <>
      <h2>Modal UI</h2>
      <Modal.Root>
        <Modal.Trigger style={{ marginLeft: "50px" }}>
          modal-on/off
        </Modal.Trigger>
        <Modal.Content>
          <div>This is Modal Content;</div>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}

export default App;
