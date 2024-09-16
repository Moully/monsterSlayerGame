function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}

const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            specialAttack: 3,
            winner: null,
            logMessage: []
        }
    },
    computed:{
        monsterBarStyles(){
            if(this.monsterHealth <0){
                return {width: "0%"}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if(this.playerHealth <0){
                return {width: "0%"}
            }
            return {width: this.playerHealth + '%'}
        }
    },
    watch:{
        playerHealth(healthValue){
            if(healthValue <=0 && this.monsterHealth <=0){
                this.winner = "draw"
            }else if( healthValue <=0 ){
                this.winner = "monster"
            }
        },
        monsterHealth(healthValue){
            if(healthValue <=0 && this.playerHealth <=0){
                this.winner = "draw"
            }else if(healthValue<0){
                this.winner = "player"
            }
        }
    },
    methods:{
        startGame(){
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.winner = null,
            this.logMessage = []
        },

        attackMonster(){
            this.specialAttack++
            const attackValue =  getRandomValue(5, 12)
            this.monsterHealth = this.monsterHealth - attackValue
            this.addLogMessage("player", "attack", attackValue)
            this.attackPlayer()
        },
        attackPlayer(){
            const attackValue =  getRandomValue(8, 15)
            this.playerHealth = this.playerHealth - attackValue
            this.addLogMessage("monster", "attack", attackValue)
        },
        specialAttackMonster(){
            const attackValue = getRandomValue(10, 25)
            this.monsterHealth = this.monsterHealth - attackValue
            this.addLogMessage("player", "Special Attack", attackValue)
            this.attackPlayer()
            this.specialAttack = 0
        },
        mayUseSpecialAttackNow(){
            return this.specialAttack < 3 
        },
        healPlayer(){
            this.specialAttack++
            const HealValue = getRandomValue(10, 13)
            if(this.playerHealth + HealValue > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += HealValue
            }
            this.addLogMessage("player", "heal", HealValue)
            this.attackPlayer()
        },
        surrender(){
            this.winner = 'monster'
        },
        addLogMessage(who, what, value){
            this.logMessage.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
});
app.mount("#game")

