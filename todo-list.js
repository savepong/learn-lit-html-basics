import { LitElement, html, css } from "https://unpkg.com/lit-element?module";

class TodoList extends LitElement {
  static get properties() {
    return {
      todos: {
        type: Array,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        color: blue;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      button {
        background: transparent;
        border: none;
        color: red;
        cursor: pointer;
      }
    `;
  }

  _changeTodoFinished(e, changedTodo) {
    const eventDetails = { changedTodo, finished: e.target.checked };
    this.dispatchEvent(
      new CustomEvent("change-todo-finished", { detail: eventDetails })
    );
  }

  _removeTodo(item) {
    this.dispatchEvent(new CustomEvent("remove-todo", { detail: item }));
  }

  render() {
    if (!this.todos) {
      return html``;
    } else {
      return html`
        <ol>
          ${this.todos.map(
            (todo) => html`
              <li>
                <input
                  type="checkbox"
                  .checked=${todo.finished}
                  @change=${(e) => this._changeTodoFinished(e, todo)}
                />
                ${todo.text} (${todo.finished ? "Finished" : "Unfinished"})
                <button @click="${() => this._removeTodo(todo)}">X</button>
              </li>
            `
          )}
        </ol>
      `;
    }
  }
}

customElements.define("todo-list", TodoList);
