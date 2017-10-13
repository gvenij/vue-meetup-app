<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 class="text-sm-right text-xs-center">
                <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-sm-left text-xs-center">
                <v-btn large router to="/meetup/new" class="info">Organize Meetup</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                        v-for="meetup in meetups"
                        v-bind:key="meetup.id"
                        v-bind:src="meetup.imageUrl"
                        transition="fade"
                        reverseTransition="fade"
                        @click="onLoadMeetup(meetup.id)"
                    >
                    <div class="title">
                        {{meetup.title}}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12 class="text-xs-center">
                <p>Join our awesome meetups!</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        font-size: 2em;
        padding: 20px;
        background-color: rgba(0,0,0,0.5);
        color: white;   
    }
</style>
