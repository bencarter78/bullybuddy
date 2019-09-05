class Dart {
  constructor(multiplyer = 1) {
    this.value;
    this.multiplyer = multiplyer;
  }

  get score() {
    return this.multiplyer * this.value;
  }
}

class Single extends Dart {
  constructor(value) {
    super();
    this.value = value;
  }
}

class Double extends Dart {
  constructor(value) {
    super(2);
    this.value = value;
  }
}

class Treble extends Dart {
  constructor(value) {
    super(3);
    this.value = value;
  }
}

class OuterBull extends Dart {
  constructor() {
    super();
    this.value = 25;
  }
}

class Bull extends Dart {
  constructor() {
    super();
    this.value = 50;
  }
}

class Miss extends Dart {
  constructor() {
    super();
    this.value = 0;
  }
}

export { Single, Double, Treble, OuterBull, Bull, Miss };
