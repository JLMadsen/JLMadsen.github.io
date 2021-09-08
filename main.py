import os
import sys



def main():
    output = ''
    folder = './posts'
    files = []

    for f in os.listdir((folder)):

        with open(folder +'/'+ f) as post:
            content = post.readlines()
            title = content[0]
            title = title[3:-3].strip()

            output += f'<li href="{folder}/{f}">{title}</li>'

    #files = [f for f in os.listdir(folder) if '.md' in f]
    #output = '\n'.join([ f'<li href=\"./posts/{filename}\">{filename.split(".")[0]}</li>' for filename in files ])

    with open('posts.txt', 'w') as f:
        f.write(output)

if __name__ == '__main__':
    main()