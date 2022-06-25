import math
import moviepy.editor as mpe

MP3_FILE_PATH = "songs/cityofgods.mp3"
VIDEO_FILE_PATH = 'video_image/clip.mp4'

audio_background = mpe.AudioFileClip(MP3_FILE_PATH)
audio_length = audio_background.duration

video = mpe.VideoFileClip(VIDEO_FILE_PATH)
video_length = video.duration

clip_without_capcut = video.subclip(0, video_length - 3) # Remove CapCut logo ending
clip_without_capcut_slowed = clip_without_capcut.fx(mpe.vfx.speedx, 0.7) # Slow it down

# Resize to portrait mode? https://zulko.github.io/moviepy/ref/videofx/moviepy.video.fx.all.resize.html

amount = math.ceil(audio_length / clip_without_capcut_slowed.duration)
list = [clip_without_capcut_slowed for _ in range(amount)]

final_video = mpe.concatenate_videoclips(list, method='compose')

final_video.audio = audio_background
final_video.write_videofile('output.mp4')
