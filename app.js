const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
require("dotenv").config();
const date = require(__dirname + "/day.js");

// Global variables for models
let Item;
let List;
let defaultItems;

// MongoDB method for using the database for storing and retrieval of data
async function main() {
    try {
        // Connecting to MongoDB server deployed on MongoDB Atlas
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Defining items schema to store the items
        const itemsSchema = new mongoose.Schema({
            name: String
        });

        // Creating a model based on itemsSchema
        Item = mongoose.model("Item", itemsSchema);

        const item1 = new Item({
            name: "Welcome to ToDo-List"
        });
        const item2 = new Item({
            name: "To add new item click + button"
        });
        const item3 = new Item({
            name: "<-- Click to remove item"
        });

        // Creating an array to store default items
        defaultItems = [item1, item2, item3];

        // Defining a listSchema to store list name and its items
        const listSchema = {
            name: String,
            items: [itemsSchema]
        };

        // Creating a List model based on listSchema
        List = mongoose.model("List", listSchema);

    } catch (err) {
        console.error("Error in main:", err);
    }
}

main().then(() => {
    const app = express();

    // Setting the ejs template
    app.set('view engine', "ejs");

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));

    app.get("/", function (req, res) {
        const day = date(); // For displaying the day in a particular format

        // Find all items in the Item collection
        Item.find({}, function (err, foundItems) {
            if (err) {
                console.log("Error finding items: ", err);
            }

            if (foundItems.length === 0) {
                // If no items found, insert default items
                Item.insertMany(defaultItems, function (err) {
                    if (err) {
                        console.log("Error inserting default items: ", err);
                    } else {
                        console.log("Successfully saved default items to DB");
                    }
                    res.redirect("/");
                });
            } else {
                // Render the list view with the found items
                res.render("list", { listtitle: day, newDataItem: foundItems });
            }
        });
    });

    app.get("/:customListName", (req, res) => {
        const customListName = _.capitalize(req.params.customListName);

        List.findOne({ name: customListName }, function (err, foundList) {
            if (!err) {
                if (!foundList) {
                    // If no list found, create a new list with default items
                    const list = new List({
                        name: customListName,
                        items: defaultItems
                    });
                    list.save();
                    res.redirect("/" + customListName);
                } else {
                    // Render the list view with the found list's items
                    res.render("list", { listtitle: foundList.name, newDataItem: foundList.items });
                }
            }
        });
    });

    app.post("/", function (req, res) {
        const itemName = req.body.newItem;
        const listName = req.body.list;
        const day = date();

        const item = new Item({
            name: itemName
        });

        if (listName === day) {
            // If posting to home list, save the item to the Item collection
            item.save();
            res.redirect("/");
        } else {
            // Find the list by name and add the item to the list
            List.findOne({ name: listName }, function (err, foundList) {
                if (!err) {
                    foundList.items.push(item);
                    foundList.save();
                    res.redirect("/" + listName);
                }
            });
        }
    });

    app.post("/delete", function (req, res) {
        const checkedItemID = req.body.checkbox;
        const listName = req.body.listName;
        const day = date();

        if (listName === day) {
            // If deleting from home list, remove item by ID
            Item.findByIdAndRemove(checkedItemID, function (err) {
                if (!err) {
                    console.log("Successfully deleted checked item");
                    res.redirect("/");
                }
            });
        } else {
            // Find the list by name and remove the item from the list
            List.findOneAndUpdate(
                { name: listName },
                { $pull: { items: { _id: checkedItemID } } },
                function (err, foundList) {
                    if (!err) {
                        res.redirect("/" + listName);
                    }
                }
            );
        }
    });

    app.get("/work", function (req, res) {
        res.render("list", { listtitle: "Work List", newDataItem: workitems });
    });

    app.post("/work", function (req, res) {
        let item = req.body.newItem;
        workitems.push(item);
        res.redirect("/work");
    });

    app.get("/about", function (req, res) {
        res.render("about");
    });

    // Start the server only after the database connection is established
    app.listen(process.env.PORT || 3000, function () {
        console.log("Server running at port 3000");
    });
}).catch(err => {
    console.log("Failed to start the server: ", err);
});
