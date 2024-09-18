import ComicAvatar from "@/components/ComicAvatar";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function VotingPage() {
  return (
    <div className='flex flex-col items-center justify-center flex-1 gap-4'>
      <Card className='shadow-cartoon-small'>
        <CardHeader>
          <CardTitle className='text-4xl'>Pick you favorite</CardTitle>
          <CardDescription className='text-3xl'>In a surprising turn of events, the new superhero&apos;s secret power is ________.</CardDescription>
        </CardHeader>
        <CardFooter className='flex flex-col gap-2'>
          <Progress value={50} />
          <CardDescription className='text-2xl'>4 out of 5 players have voted</CardDescription>
        </CardFooter>
      </Card>
      <div className='grid grid-cols-2 gap-2'>
        <div className='flex gap-4'>
          <ComicAvatar initials='P1' />
          <Card className='relative'>
            <span className='absolute left-[-25px]'>
              <svg className='fill-card translate-y-[25px] translate-x-[5px] rotate-90' width='30' height='15' viewBox='0 0 30 10' preserveAspectRatio='none'>
                <polygon points='0,0 30,0 15,10'></polygon>
              </svg>
            </span>
            <CardHeader>
              <CardTitle>Instantaneous dance moves</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className='flex gap-4'>
          <Card className='relative shadow-cartoon-mirrored-x'>
            <span className='absolute right-[-25px]'>
              <svg className='fill-card translate-y-[25px] translate-x-[-3px] rotate-[270deg]' width='30' height='15' viewBox='0 0 30 10' preserveAspectRatio='none'>
                <polygon points='0,0 30,0 15,10'></polygon>
              </svg>
            </span>
            <CardHeader>
              <CardTitle>The ability to speak to vegetables</CardTitle>
            </CardHeader>
          </Card>
          <ComicAvatar initials='P2' flip />
        </div>
        <div className='flex gap-4'>
          <ComicAvatar initials='P3' />
          <Card className='relative'>
            <span className='absolute left-[-25px]'>
              <svg className='fill-card translate-y-[25px] translate-x-[5px] rotate-90' width='30' height='15' viewBox='0 0 30 10' preserveAspectRatio='none'>
                <polygon points='0,0 30,0 15,10'></polygon>
              </svg>
            </span>
            <CardHeader>
              <CardTitle>Turning any object into a rubber duck</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className='flex gap-4'>
          <Card className='relative shadow-cartoon-mirrored-x'>
            <span className='absolute right-[-25px]'>
              <svg className='fill-card translate-y-[25px] translate-x-[-3px] rotate-[270deg]' width='30' height='15' viewBox='0 0 30 10' preserveAspectRatio='none'>
                <polygon points='0,0 30,0 15,10'></polygon>
              </svg>
            </span>
            <CardHeader>
              <CardTitle>Unlimited supply of dad jokes</CardTitle>
            </CardHeader>
          </Card>
          <ComicAvatar initials='P4' flip />
        </div>
      </div>
    </div>
  );
}
