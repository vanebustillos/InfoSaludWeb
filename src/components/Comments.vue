<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-card class="pa-2" outlined tile>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline">
              Comentarios
            </v-list-item-title>
            <v-divider></v-divider>
          </v-list-item-content>
        </v-list-item>
        <v-list style="max-height: 150px" class="overflow-y-auto" rounded>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="cmnt in comments" :key="cmnt.author">
              <v-list-item-content>
                <b> @{{ cmnt.author }} :</b
                ><span
                  ><i>[{{ cmnt.date }}]: </i> {{ cmnt.content }}</span
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-row no-gutters>
          <v-col md="12" class="pt-5">
            <v-text-field
              placeholder="Escriba un comentario:"
              filled
              rounded
              dense
              v-model="content"
              :rules="commentRule"
              required
            ></v-text-field>
          </v-col>
          <v-col md="9">
            <v-text-field
              placeholder="Autor:"
              filled
              rounded
              dense
              v-model="author"
              :rules="commentRule"
              required
            ></v-text-field>
          </v-col>
          <v-col class="pl-5">
            <v-btn :disabled="!valid" rounded outlined @click="addComment">
              Publicar
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { db, firebase } from "@/firebaseConfig.js";
export default {
  name: "Comments",
  components: {},

  data: () => ({
    selectedItem: 1,
    valid: true,
    author: "",
    content: "",
    name: "",
    commentRule: [v => !!v || "Campo requerido"],
    comments: []
  }),

  props: {
    place: {
      type: String
    },
    doc: {
      type: String
    }
  },

  mounted() {
    this._retrieveComments();
  },

  methods: {
    addComment() {
      if (this.$refs.form.validate()) {
        db.collection(this.place)
          .doc(this.doc)
          .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
              date: this._getCurrentDate(),
              author: this.author,
              content: this.content
            })
          });
        this.comments.push({
          date: this._getCurrentDate(),
          author: this.author,
          content: this.content
        });
        this.$refs.form.reset();
      }
    },
    _getCurrentDate() {
      const today = new Date();
      const date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();
      return date;
    },
    _retrieveComments() {
      db.collection(this.place)
        .doc(this.doc)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.data() != null) {
            querySnapshot.data().comments.forEach(comment => {
              this.comments.push({
                date: comment.date,
                author: comment.author,
                content: comment.content
              });
            });
          }
        });
    }
  }
};
</script>
<style></style>
