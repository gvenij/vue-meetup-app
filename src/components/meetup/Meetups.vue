<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs-12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="info mb-3" v-for="meetup in meetups" :key="meetup.id">
                    <v-container fluid>
                        <v-layout>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                        :src="meetup.imageUrl"
                        height="125px"
                      ></v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h5 class="white mb-0">{{meetup.title}}</h5>
                                        <div>{{meetup.date}}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat :to="'/meetups/' + meetup.id"><v-icon>arrow_forward</v-icon>
                                        View meetup
                                     </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
