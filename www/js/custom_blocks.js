Blockly.Blocks['movement_front'] = {
  init: function() {
    this.appendValueInput("foward")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Andar Para Frente");
    this.setPreviousStatement(true, "String");
    this.setNextStatement(true, "String");
    this.setColour(230);
    this.setTooltip('Andar para frente com guimo');
    this.setHelpUrl('http://guimo.toys');
  }
};

Blockly.Blocks['movement_back'] = {
  init: function() {
    this.appendValueInput("back")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Andar Para Trás");
    this.setPreviousStatement(true, "String");
    this.setNextStatement(true, "String");
    this.setColour(230);
    this.setTooltip('Andar para trás com guimo');
    this.setHelpUrl('http://guimo.toys');
  }
};

Blockly.Blocks['movement_right'] = {
  init: function() {
    this.appendValueInput("right")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Virar Para Direita");
    this.setPreviousStatement(true, "String");
    this.setNextStatement(true, "String");
    this.setColour(210);
    this.setTooltip('Andar para direita  com guimo');
    this.setHelpUrl('http://guimo.toys');
  }
};

Blockly.Blocks['movement_left'] = {
  init: function() {
    this.appendValueInput("left")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Virar Para Esquerda");
    this.setPreviousStatement(true, "String");
    this.setNextStatement(true, "String");
    this.setColour(210);
    this.setTooltip('Andar para esquerda com guimo');
    this.setHelpUrl('http://guimo.toys');
  }
};

Blockly.Blocks['guimo_repeat'] = {
  init: function() {
    this.appendStatementInput("repeat")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Repita")
        .appendField(new Blockly.FieldDropdown([["1","1"], ["2","2"], ["3","3"], ["4","4"], ["5","5"]]), "times")
        .appendField(" vez(es)");
    this.setInputsInline(false);
    this.setNextStatement(false, null);
    this.setColour(20);
    this.setTooltip('Repetir de 1 a 5 vezes');
    this.setHelpUrl('');
  }
};
