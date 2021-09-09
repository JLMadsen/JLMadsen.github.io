import os
import sys

def main():
    output = ''
    folder = './posts'

    for f in os.listdir((folder)):

        with open(folder +'/'+ f) as post:
            content = post.readlines()
            title = content[0][3:-3].strip()
            output += f'{folder}/{f}|{title}\n'

    print(output.count('\n'), 'files found')

    #files = [f for f in os.listdir(folder) if '.md' in f]
    #output = '\n'.join([ f'<li href=\"./posts/{filename}\">{filename.split(".")[0]}</li>' for filename in files ])

    with open('posts.txt', 'w') as f:
        f.write(output)

    print('created file')
    print([f for f in os.listdir() if '.txt' in f])

if __name__ == '__main__':
    main()