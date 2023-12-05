const { expect } = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const app = require("../index.js"); // Assuming this is your Express app

const Categories = require("../models/category.js");

describe("Categories API", () => {


  describe("GET /categories", () => {
    it("should return all categories", async () => {
      data =  [{
        "category_id": 1,
        "name": "category1",
        "created_at": "2021-10-05T00:00:00.000Z",
        "updated_at": "2021-10-05T00:00:00.000Z",
        "created_by": 1,
        "updated_by": 1,
      },
      {
        "category_id": 2,
        "name": "category2",
        "created_at": "2021-10-05T00:00:00.000Z",
        "updated_at": "2021-10-05T00:00:00.000Z",
        "created_by": 1,
        "updated_by": 1,
      }
    ]
      const findAllStub = sinon.stub(Categories, "findAll").resolves(data
      );
      const res = await request(app).get("/api/v1/categories");
      expect(res.status).to.equal(200);
      expect(res.body.code).to.equal(1);
      expect(res.body.message).to.equal("OK");
      expect(res.body.content).to.deep.equal([
        {
          "category_id": 1,
          "name": "category1",
     
        },
        {
          "category_id": 2,
          "name": "category2",

        }
      ]);
      findAllStub.restore();
    });

    it("should handle error when retrieving categories", async () => {
      const findAllStub = sinon.stub(Categories, "findAll").rejects(new Error("Database error"));
      const res = await request(app).get("/api/v1/categories");
      expect(res.status).to.equal(500);
      expect(res.body.code).to.equal(0);
      expect(res.body.message).to.equal("Error en consulta");
      expect(res.body.content).to.equal("");
      findAllStub.restore();
    });
  });

  describe("GET /categories/:id", () => {
    it("should return a specific category by ID", async () => {
      const findOneStub = sinon.stub(Categories, "findOne").resolves("category1");
      const res = await request(app).get("/api/v1/categories/1");
      expect(res.status).to.equal(200);
      expect(res.body.code).to.equal(1);
      expect(res.body.message).to.equal("OK");
      expect(res.body.content).to.equal("category1");
      findOneStub.restore();

    });

    it("should handle error when retrieving a category", async () => {
      const findOneStub = sinon.stub(Categories, "findOne").rejects(new Error("Database error"));

      const res = await request(app).get("/api/v1/categories/1");

      expect(res.status).to.equal(500);
      expect(res.body.code).to.equal(0);
      expect(res.body.message).to.equal("Error en consulta");
      expect(res.body.content).to.equal("");

      findOneStub.restore();
    });

    it("should return 404 if category is not found", async () => {
      const findOneStub = sinon.stub(Categories, "findOne").resolves(null);

      const res = await request(app).get("/api/v1/categories/1");

      expect(res.status).to.equal(404);
      expect(res.body.code).to.equal(0);
      expect(res.body.message).to.equal("Category not found");
      expect(res.body.content).to.equal("");

      findOneStub.restore();
    });
  });

  describe("POST /categories", () => {
    it("should create a new category", async () => {
      const createStub = sinon.stub(Categories, "create").resolves("newCategory");

      const res = await request(app)
        .post("/api/v1/categories")
        .send({
          name: "Test Category",
        });

      expect(res.status).to.equal(201);
      expect(res.body.code).to.equal(1);
      expect(res.body.message).to.equal("Category created successfully");
      expect(res.body.content).to.equal("newCategory");

      createStub.restore();
    });

    it("should handle error when creating a category", async () => {
      const createStub = sinon.stub(Categories, "create").rejects(new Error("Database error"));

      const res = await request(app)
        .post("/api/v1/categories")
        .send({
          category_name: "Test Category",
          description: "Test Description",
          created_by: "Test User",
          updated_by: "Test User",
        });

      expect(res.status).to.equal(500);
      expect(res.body.code).to.equal(0);
      expect(res.body.message).to.equal("Error en consulta");
      expect(res.body.content).to.equal("");

      createStub.restore();
    });
  });

  // describe("PUT /categories/:id", () => {
  //   it("should update a category", async () => {
  //     const updateStub = sinon.stub(Categories, "update").resolves([1]);

  //     const res = await request(app)
  //       .put("/categories/1")
  //       .send({
  //         category_name: "Updated Category",
  //         description: "Updated Description",
  //         updated_by: "Test User",
  //       });

  //     expect(res.status).to.equal(200);
  //     expect(res.body.code).to.equal(1);
  //     expect(res.body.message).to.equal("Category updated successfully");
  //     expect(res.body.content).to.equal("");

  //     updateStub.restore();
  //   });

  //   it("should handle error when updating a category", async () => {
  //     const updateStub = sinon.stub(Categories, "update").rejects(new Error("Database error"));

  //     const res = await request(app)
  //       .put("/categories/1")
  //       .send({
  //         category_name: "Updated Category",
  //         description: "Updated Description",
  //         updated_by: "Test User",
  //       });

  //     expect(res.status).to.equal(500);
  //     expect(res.body.code).to.equal(0);
  //     expect(res.body.message).to.equal("Error en consulta");
  //     expect(res.body.content).to.equal("");

  //     updateStub.restore();
  //   });

  //   it("should return 404 if category is not found", async () => {
  //     const updateStub = sinon.stub(Categories, "update").resolves([0]);

  //     const res = await request(app)
  //       .put("/categories/1")
  //       .send({
  //         category_name: "Updated Category",
  //         description: "Updated Description",
  //         updated_by: "Test User",
  //       });

  //     expect(res.status).to.equal(404);
  //     expect(res.body.code).to.equal(0);
  //     expect(res.body.message).to.equal("Category not found");
  //     expect(res.body.content).to.equal("");

  //     updateStub.restore();
  //   });
  // });

  // describe("DELETE /categories/:id", () => {
  //   it("should delete a category", async () => {
  //     const destroyStub = sinon.stub(Categories, "destroy").resolves(1);

  //     const res = await request(app).delete("/categories/1");

  //     expect(res.status).to.equal(200);
  //     expect(res.body.code).to.equal(1);
  //     expect(res.body.message).to.equal("Category deleted successfully");
  //     expect(res.body.content).to.equal("");

  //     destroyStub.restore();
  //   });

  //   it("should handle error when deleting a category", async () => {
  //     const destroyStub = sinon.stub(Categories, "destroy").rejects(new Error("Database error"));

  //     const res = await request(app).delete("/categories/1");

  //     expect(res.status).to.equal(500);
  //     expect(res.body.code).to.equal(0);
  //     expect(res.body.message).to.equal("Error en consulta");
  //     expect(res.body.content).to.equal("");

  //     destroyStub.restore();
  //   });

  //   it("should return 404 if category is not found", async () => {
  //     const destroyStub = sinon.stub(Categories, "destroy").resolves(0);

  //     const res = await request(app).delete("/categories/1");

  //     expect(res.status).to.equal(404);
  //     expect(res.body.code).to.equal(0);
  //     expect(res.body.message).to.equal("Category not found");
  //     expect(res.body.content).to.equal("");

  //     destroyStub.restore();
  //   });
  // });
});