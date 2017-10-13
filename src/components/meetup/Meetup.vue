<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{meetup.title}}</h6>
          </v-card-title>
          <v-card-media
          :src="meetup.imageUrl"
          height="400px"
          ></v-card-media>
          <v-card-text>
            <div class="info--text">{{meetup.date}}</div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, vel, laborum! Harum assumenda, libero quis sunt molestias, accusantium asperiores aliquid fugiat voluptatum, tempora, magni doloremque beatae fuga illo qui. At mollitia adipisci quisquam quos sunt corrupti dolorem facilis, vero obcaecati commodi facere dolorum, amet aliquid hic consectetur! Doloremque deleniti quod obcaecati labore, quibusdam ea ratione a atque, minus dolorum esse voluptate placeat recusandae sapiente voluptas dolorem qui id culpa beatae eius deserunt aliquid, odio vitae. Quia, inventore nesciunt dolor sint!</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>
