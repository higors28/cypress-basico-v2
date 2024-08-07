/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  this.beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl nec nisl ultrices luctus. Sed nec ex nec eros tincidunt fermentum. Sed auctor, velit nec feugiat tincidunt, felis mi scelerisque eros, nec tincidunt justo nunc eget nunc. Nulla facilisi. In hac habitasse platea dictumst. Donec auctor, nunc ut semper sagittis, eros arcu tincidunt libero, nec ultricies justo libero nec elit. Sed auctor, velit nec feugiat tincidunt, felis mi scelerisque eros, nec tincidunt justo nunc eget nunc. Nulla facilisi. In hac habitasse platea dictumst. Donec auctor, nunc ut semper sagittis, eros arcu tincidunt libero, nec ultricies justo libero nec elit.";
    cy.get("#firstName").type("Fancy");
    cy.get("#lastName").type("Name");
    cy.get("#email").type("fancy.name@fancyprovider.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains(".button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName").type("Fancy");
    cy.get("#lastName").type("Name");
    cy.get("#email").type("fancy.name@fancyprovider,com");
    cy.get("#open-text-area").type("any message");
    cy.contains(".button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("campo de telefone continua vazio quando preenchido com valor não númerico", function () {
    cy.get("#phone").type("abc").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.get("#firstName").type("Fancy");
    cy.get("#lastName").type("Name");
    cy.get("#email").type("fancy.name@fancyprovider.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("any message");
    cy.contains(".button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome e telefone", function () {
    cy.get("#firstName")
      .type("Fancy")
      .should("have.value", "Fancy")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Name")
      .should("have.value", "Name")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("123456")
      .should("have.value", "123456")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.", function () {
    cy.contains(".button", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMnadatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("marca o tipo de atendimento feedback", function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento e verifica se está marcado", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando drag-and-drop", function () {
    cy.get('input[type="file"]#file-upload')
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture pra a qual foi dada um alias", function () {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]#file-upload')
      .selectFile("@sampleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it(" verifica que a politica de privade abre em outra aba sem a necssidade de click", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it(" verifica que a politica de privade abre em outra aba sem a necssidade de click", function () {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should;
  });
});
