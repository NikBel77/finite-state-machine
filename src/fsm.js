class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.states = config.states;
        this.activeState = config.initial;
        this.undoState = [];
        this.redoState = [];
        if (config === 0) {
            trow (Error);
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return (this.activeState);
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        for (let key in this.states) {
            if (key === state) {
                this.undoState.push(this.activeState);
                this.redoState.length = 0;
                this.activeState = state;
                return (this);
            }
        }
        trow (Error);
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let active = this.activeState;
        let transit = this.states[active].transitions
        for (let key in transit) {
            if (key === event) {
                this.undoState.push(this.activeState);
                this.redoState.length = 0;
                this.activeState = transit[event];
                return (this);
            }
        }
        trow (Error);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = 'normal';
        return (this)
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = [];
        if (event === undefined) {
            for (let key in this.states) {
                arr.push(key)
            }
            return (arr)
        }
        else {
            for (let key in this.states) {
                let transit = this.states[key].transitions;
                for (let key2 in transit) {
                    if (event === key2) {
                        arr.push(key);
                    }
                }
            }
            return (arr)
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.undoState.length === 0) {
            return (false);
        }
        else {
            this.redoState.push(this.activeState);
            this.activeState = this.undoState.pop();
            return (true);
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoState.length === 0) {
            return (false);
        }
        else {
            this.activeState = this.redoState.pop();
            return (true);
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoState.length = 0;
        this.redoState.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
