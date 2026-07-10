Runner.instance_.gameOver = function() {
            this.playSound(this.soundFx.HIT);
            vibrate(200);

            this.stop();
            this.crashed = true;
            this.distanceMeter.acheivement = false;

            this.tRex.update(100, Trex.status.CRASHED);

            // Game over panel.
            if (!this.gameOverPanel) {
                this.gameOverPanel = new GameOverPanel(this.canvas,
                    this.spriteDef.TEXT_SPRITE, this.spriteDef.RESTART,
                    this.dimensions);
            } else {
                this.gameOverPanel.draw();
            }

            // Update the high score.
            if (this.distanceRan > this.highestScore) {
                this.highestScore = Math.ceil(this.distanceRan);
                this.distanceMeter.setHighScore(this.highestScore);
            }

            // Reset the time clock.
            this.time = getTimeStamp();
        },

        stop: function () {
            this.playing = false;
            this.paused = true;
            cancelAnimationFrame(this.raqId);
            this.raqId = 0;
        },

        play: function () {
            if (!this.crashed) {
                this.playing = true;
                this.paused = false;
                this.tRex.update(0, Trex.status.RUNNING);
                this.time = getTimeStamp();
                this.update();
            }
        },

        restart: function () {
            if (!this.raqId) {
                this.playCount++;
                this.runningTime = 0;
                this.playing = true;
                this.crashed = false;
                this.distanceRan = 0;
                this.setSpeed(this.config.SPEED);
                this.time = getTimeStamp();
                this.containerEl.classList.remove(Runner.classes.CRASHED);
                this.clearCanvas();
                this.distanceMeter.reset(this.highestScore);
                this.horizon.reset();
                this.tRex.reset();
                this.playSound(this.soundFx.BUTTON_PRESS);
                this.invert(true);
                this.update();
            }
        };
